export const FragmentShader = `#ifdef GL_ES
precision highp float;
#endif

varying vec2 vUv;
uniform sampler2D u_tex0;
uniform vec2 u_tex0_resolution;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_plane_size;
uniform float u_world_scale;
uniform float u_speed;
uniform float u_intensity;
uniform float u_normal;
uniform float u_brightness;
uniform float u_blur_intensity;
uniform float u_zoom;
uniform int u_blur_iterations;
uniform bool u_panning;
uniform bool u_post_processing;
uniform bool u_lightning;
uniform bool u_texture_fill;

// Uniforms for the clear spot effect
uniform vec2 u_mouse_position;
uniform float u_clear_radius;
uniform float u_clear_edge_softness;
uniform float u_clear_blur_reduction;

#define S(a, b, t) smoothstep(a, b, t)

vec3 N13(float p) {
    //  from DAVE HOSKINS
    vec3 p3 = fract(vec3(p) * vec3(.1031, .11369, .13787));
    p3 += dot(p3, p3.yzx + 19.19);
    return fract(vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

vec4 N14(float t) {
    return fract(sin(t * vec4(123., 1024., 1456., 264.)) * vec4(6547., 345., 8799., 1564.));
}
float N(float t) {
    return fract(sin(t * 12345.564) * 7658.76);
}

float Saw(float b, float t) {
    return S(0., b, t) * S(1., b, t);
}

vec2 DropLayer2(vec2 uv, float t) {
    vec2 UV = uv;

    uv.y += t * 0.75;
    vec2 a = vec2(6., 1.);
    vec2 grid = a * 2.;
    vec2 id = floor(uv * grid);

    float colShift = N(id.x);
    uv.y += colShift;

    id = floor(uv * grid);
    vec3 n = N13(id.x * 35.2 + id.y * 2376.1);
    vec2 st = fract(uv * grid) - vec2(.5, 0);

    float x = n.x - .5;

    float y = UV.y * 20.;
    float wiggle = sin(y + sin(y));
    x += wiggle * (.5 - abs(x)) * (n.z - .5);
    x *= .7;
    float ti = fract(t + n.z);
    y = (Saw(.85, ti) - .5) * .9 + .5;
    vec2 p = vec2(x, y);

    float d = length((st - p) * a.yx);

    float mainDrop = S(.4, .0, d);

    float r = sqrt(S(1., y, st.y));
    float cd = abs(st.x - x);
    float trail = S(.23 * r, .15 * r * r, cd);
    float trailFront = S(-.02, .02, st.y - y);
    trail *= trailFront * r * r;

    y = UV.y;
    float trail2 = S(.2 * r, .0, cd);
    float droplets = max(0., (sin(y * (1. - y) * 120.) - st.y)) * trail2 * trailFront * n.z;
    y = fract(y * 10.) + (st.y - .5);
    float dd = length(st - vec2(x, y));
    droplets = S(.3, 0., dd);
    float m = mainDrop + droplets * r * trailFront;

    return vec2(m, trail);
}

float StaticDrops(vec2 uv, float t) {
    uv *= 40.;

    vec2 id = floor(uv);
    uv = fract(uv) - .5;
    vec3 n = N13(id.x * 107.45 + id.y * 3543.654);
    vec2 p = (n.xy - .5) * .7;
    float d = length(uv - p);

    float fade = Saw(.025, fract(t + n.z));
    float c = S(.3, 0., d) * fract(n.z * 10.) * fade;
    return c;
}

vec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {
    float s = StaticDrops(uv, t) * l0;
    vec2 m1 = DropLayer2(uv, t) * l1;
    vec2 m2 = DropLayer2(uv * 1.85, t) * l2;

    float c = s + m1.x + m2.x;
    c = S(.3, 1., c);

    return vec2(c, max(m1.y * l0, m2.y * l1));
}

//random no.
float N21(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
}

void main() {
    // We use vUv (0-1 range) for our base coordinates since they're normalized to the plane
    vec2 uv = vUv;
    
    // Convert to centered coordinates (-0.5 to 0.5 range)
    vec2 centeredUV = uv - 0.5;
    
    // Calculate aspect ratios
    float planeAspect = u_plane_size.x / u_plane_size.y;
    float screenAspect = u_resolution.x / u_resolution.y;
    float textureAspect = u_tex0_resolution.x / u_tex0_resolution.y;
    
    // Calculate real-world scale factor
    // This makes the rain effect scale with the plane size
    float scaleFactor = 1.0 / (u_plane_size.y * u_world_scale);
    
    // Prepare UV for rain effect
    vec2 rainUV = centeredUV;
    rainUV.x *= planeAspect; // Maintain aspect ratio
    rainUV *= scaleFactor * 10.0; // Scale based on plane size
    
    // UV for texture sampling
    vec2 textureUV = uv;
    
    // Apply texture fill logic if needed
    if(u_texture_fill) {
        float texScaleX = 1.0, texScaleY = 1.0;
        if(textureAspect > planeAspect) {
            texScaleX = planeAspect / textureAspect;
        } else {
            texScaleY = textureAspect / planeAspect;
        }
        textureUV = vec2(texScaleX, texScaleY) * (uv - 0.5) + 0.5;
    }
    
    float T = u_time;
    float t = T * 0.2 * u_speed;
    float rainAmount = u_intensity;
    
    float zoom = u_panning ? -cos(T * 0.2) : 0.0;
    rainUV *= (0.7 + zoom * 0.3) * u_zoom;
    
    float staticDrops = S(-0.5, 1.0, rainAmount) * 2.0;
    float layer1 = S(0.25, 0.75, rainAmount);
    float layer2 = S(0.0, 0.5, rainAmount);
    
    vec2 c = Drops(rainUV, t, staticDrops, layer1, layer2);
    
    // Calculate normals for the rain effect
    vec2 e = vec2(0.001, 0.0) * u_normal;
    float cx = Drops(rainUV + e, t, staticDrops, layer1, layer2).x;
    float cy = Drops(rainUV + e.yx, t, staticDrops, layer1, layer2).x;
    vec2 n = vec2(cx - c.x, cy - c.x);
    
    // Scale the normal effect based on the plane size
    n *= min(1.0, 5.0 / u_plane_size.y);
    
    // Sample the texture with the distorted UVs
    vec3 col = texture2D(u_tex0, textureUV + n).rgb;
    
    // Calculate distance to mouse (for clear spot effect)
    float distToMouse = length(textureUV - u_mouse_position);
    float clearFactor = 1.0 - smoothstep(u_clear_radius - u_clear_edge_softness, 
                                        u_clear_radius + u_clear_edge_softness, 
                                        distToMouse);
    
    // Apply blur based on distance to mouse
    float adjustedBlurIntensity = u_blur_intensity * (1.0 - clearFactor * u_clear_blur_reduction);
    float blur = adjustedBlurIntensity;
    
    // Reduce normal displacement in clear area
    n *= (1.0 - clearFactor * 0.8);
    
    // Apply blur effect
    if(u_blur_iterations != 1) {
        blur *= 0.01;
        float a = N21(gl_FragCoord.xy) * 6.2831;
        for(int m = 0; m < 64; m++) {
            if(m > u_blur_iterations)
                break;
            vec2 offs = vec2(sin(a), cos(a)) * blur;
            float d = fract(sin((float(m) + 1.0) * 546.0) * 5424.0);
            d = sqrt(d);
            offs *= d;
            col += texture2D(u_tex0, textureUV + n + offs).xyz;
            a++;
        }
        col /= float(u_blur_iterations);
    }
    
    // Apply post-processing effects
    t = (T + 3.0) * 0.5;
    if(u_post_processing) {
        col *= mix(vec3(1.0), vec3(0.8, 0.9, 1.3), 1.0);
    }
    
    float fade = S(0.0, 10.0, T);
    
    if(u_lightning) {
        float lightning = sin(t * sin(t * 10.0));
        lightning *= pow(max(0.0, sin(t + sin(t))), 10.0);
        col *= 1.0 + lightning * fade * mix(1.0, 0.1, 0.0);
    }
    
    // Apply vignette effect
    vec2 vignetteUV = textureUV - 0.5;
    col *= 1.0 - dot(vignetteUV, vignetteUV) * 1.0;
    
    gl_FragColor = vec4(col * u_brightness, 1.0);
}
`