(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[9281], {
    27792: function (e, r, t) {
        "use strict";
        t.d(r, {
            E: function () {
                return d
            }
        });
        var n = t(87462), a = t(67294), i = t(99477), s = t(98483), o = t(99137), c = t(85769);
        let u =
                parseInt(i.REVISION.replace(/\D+/g, "")), l = (0, o.g)({
                color: new i.Color("white"),
                scale: new i.Vector2(1, 1),
                imageBounds: new i.Vector2(1, 1),
                resolution: 1024,
                map: null,
                zoom: 1,
                radius: 0,
                grayscale: 0,
                opacity: 1
            }, `
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`, `
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${u >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
  }
`), m = a.forwardRef(({
                                                                                                                      children: e,
                                                                                                                      color: r,
                                                                                                                      segments: t = 1,
                                                                                                                      scale: i = 1,
                                                                                                                      zoom: o = 1,
                                                                                                                      grayscale: c = 0,
                                                                                                                      opacity: u = 1,
                                                                                                                      radius: m = 0,
                                                                                                                      texture: f,
                                                                                                                      toneMapped: v,
                                                                                                                      transparent: d,
                                                                                                                      side: p,
                                                                                                                      ...h
                                                                                                                  }, g) => {
                (0, s.e)({ImageMaterial: l});
                let x = a.useRef(null), y = (0, s.A)(e => e.size), w = Array.isArray(i) ? [i[0], i[1]] : [i, i],
                    j = [f.image.width, f.image.height], b = Math.max(y.width, y.height);
                return a.useImperativeHandle(g, () => x.current, []), a.useLayoutEffect(() => {
                    x.current.geometry.parameters && x.current.material.scale.set(w[0] * x.current.geometry.parameters.width, w[1] * x.current.geometry.parameters.height)
                }, []), a.createElement("mesh", (0, n.Z)({
                    ref: x,
                    scale: Array.isArray(i) ? [...i, 1] : i
                }, h), a.createElement("planeGeometry", {args: [1, 1, t, t]}), a.createElement("imageMaterial", {
                    color: r,
                    map: f,
                    zoom: o,
                    grayscale: c,
                    opacity: u,
                    scale: w,
                    imageBounds: j,
                    resolution: b,
                    radius: m,
                    toneMapped: v,
                    transparent: d,
                    side: p,
                    key: l.key
                }), e)
            }), f = a.forwardRef(({url: e, ...r}, t) => {
                let i = (0, c.m)(e);
                return a.createElement(m, (0, n.Z)({}, r, {texture: i, ref: t}))
            }), v = a.forwardRef(({url: e, ...r}, t) => a.createElement(m, (0, n.Z)({}, r, {ref: t}))),
            d = a.forwardRef((e, r) => {
                if (e.url) return a.createElement(f, (0, n.Z)({}, e, {ref: r}));
                if (e.texture) return a.createElement(v, (0, n.Z)({}, e, {ref: r}));
                throw Error("<Image /> requires a url or texture")
            })
    }, 99137: function (e, r, t) {
        "use strict";
        t.d(r, {
            g: function () {
                return shaderMaterial
            }
        });
        var n = t(99477);

        function shaderMaterial(e, r, t, a) {
            let i = class extends n.ShaderMaterial {
                constructor(i = {}) {
                    let s = Object.entries(e);
                    super({
                        uniforms: s.reduce((e, [r, t]) => {
                            let a = n.UniformsUtils.clone({[r]: {value: t}});
                            return {...e, ...a}
                        }, {}), vertexShader: r, fragmentShader: t
                    }), this.key = "", s.forEach(([e]) => Object.defineProperty(this, e, {
                        get: () => this.uniforms[e].value,
                        set: r => this.uniforms[e].value = r
                    })), Object.assign(this, i), a && a(this)
                }
            };
            return i.key = n.MathUtils.generateUUID(), i
        }
    }, 90319: function (e, r, t) {
        "use strict";
        t.d(r, {
            R: function () {
                return useFBO
            }
        });
        var n = t(67294), a = t(99477), i = t(98483);

        function useFBO(e, r, t) {
            let s = (0, i.A)(e => e.size), o = (0, i.A)(e => e.viewport),
                c = "number" == typeof e ? e : s.width * o.dpr, u = "number" == typeof r ? r : s.height * o.dpr,
                l = ("number" == typeof e ? t : e) || {}, {samples: m = 0, depth: f, ...v} = l, d = n.useMemo(() => {
                    let e = new a.WebGLRenderTarget(c, u, {
                        minFilter: a.LinearFilter,
                        magFilter: a.LinearFilter,
                        type: a.HalfFloatType, ...v
                    });
                    return f && (e.depthTexture = new a.DepthTexture(c, u, a.FloatType)), e.samples = m, e
                }, []);
            return n.useLayoutEffect(() => {
                d.setSize(c, u), m && (d.samples = m)
            }, [m, d, c, u]), n.useEffect(() => () => d.dispose(), []), d
        }
    }, 85769: function (e, r, t) {
        "use strict";
        t.d(r, {
            m: function () {
                return useTexture
            }
        });
        var n = t(99477), a = t(98483), i = t(67294);
        let IsObject = e => e === Object(e) && !Array.isArray(e) && "function" != typeof e;

        function useTexture(e, r) {
            let t = (0, a.A)(e => e.gl), s = (0, a.F)(n.TextureLoader, IsObject(e) ? Object.values(e) : e);
            if ((0, i.useLayoutEffect)(() => {
                null == r || r(s)
            }, [r]), (0, i.useEffect)(() => {
                if ("initTexture" in t) {
                    let e = Array.isArray(s) ? s : [s];
                    e.forEach(t.initTexture)
                }
            }, [t, s]), !IsObject(e)) return s;
            {
                let r = {}, t = 0;
                for (let n in e) r[n] = s[t++];
                return r
            }
        }

        useTexture.preload = e => a.F.preload(n.TextureLoader, e), useTexture.clear = e => a.F.clear(n.TextureLoader, e)
    }, 82883: function (e, r, t) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/demos/ripple-shader", function () {
            return t(88004)
        }])
    }, 88004: function (e, r, t) {
        "use strict";
        t.r(r), t.d(r, {
            default: function () {
                return Home
            }
        });
        var n = t(85893), a = t(15029), i = t(67294), s = t(98483), o = t(90319), c = t(62266);

        function Waves(e) {
            let {pointer: r} = e, t = (0, i.useRef)([]), a = (0, i.useRef)({x: 0, y: 0}), o = (0, i.useRef)(0),
                u = (0, s.F)(c.d, "/medias/demos/ripple-shader/ripple.png");
            (0, s.C)(e => {
                let {viewport: t} = e;
                manageMouse({x: r.x * t.width / 2, y: r.y * t.height / 2}), manageWaves()
            });
            let manageMouse = e => {
                let {x: r, y: t} = a.current;
                (Math.abs(e.x - r) > .01 || Math.abs(e.y - t) > .01) && (o.current = (o.current + 1) % 100, a.current = {...e}, setWave(e.x, e.y, o.current))
            }, manageWaves = () => {
                t.current.forEach(e => {
                    e.rotation.z += .025, e.material.opacity *= .95, e.scale.x = .98 * e.scale.x + .155, e.scale.y = .98 * e.scale.y + .155
                })
            }, setWave = (e, r, n) => {
                let a = t.current[n];
                a.position.x = e, a.position.y = r, a.material.opacity = 1, a.scale.x = 1.75, a.scale.y = 1.75, a.visible = !0
            };
            return (0, n.jsx)("group", {
                children: [...Array(100)].map((e, r) => (0, n.jsxs)("mesh", {
                    ref: e => t.current[r] = e,
                    "rotation-z": Math.random(),
                    visible: !1,
                    children: [(0, n.jsx)("planeGeometry", {args: [1, 1, 1, 1]}), (0, n.jsx)("meshBasicMaterial", {
                        map: u,
                        transparent: !0
                    })]
                }, r))
            })
        }

        var u = t(99477), l = t(27792);

        function Images() {
            let {viewport: e} = (0, s.A)();
            return (0, n.jsxs)("group", {
                children: [(0, n.jsx)(l.E, {
                    position: [-.25 * e.width, 0, 1],
                    scale: [e.width / 5, e.width / 4, 1],
                    url: "/medias/demos/ripple-shader/picture2.jpeg"
                }), (0, n.jsx)(l.E, {
                    position: [0 * e.width, 0, 1],
                    scale: [e.width / 5, e.width / 4, 1],
                    url: "/medias/demos/ripple-shader/picture3.jpeg"
                }), (0, n.jsx)(l.E, {
                    position: [.25 * e.width, 0, 1],
                    scale: [e.width / 5, e.width / 4, 1],
                    url: "/medias/demos/ripple-shader/picture1.jpeg"
                })]
            })
        }

        function Scene() {
            let e = (0, i.useRef)(), r = new u.Scene, t = new u.Scene, a = (0, o.R)(), c = (0, o.R)(), {
                pointer: l,
                viewport: m
            } = (0, s.A)();
            (0, s.C)(n => {
                let {gl: i, camera: s} = n;
                i.setRenderTarget(a), i.render(r, s), e.current.material.uniforms.uDisplacement.value = a.texture, i.setRenderTarget(c), i.render(t, s), e.current.material.uniforms.uTexture.value = c.texture, i.setRenderTarget(null), e.current.material.uniforms.winResolution.value = new u.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(Math.min(window.devicePixelRatio, 2))
            });
            let f = (0, i.useMemo)(() => ({
                uTexture: {value: null},
                uDisplacement: {value: null},
                winResolution: {value: new u.Vector2(0, 0)}
            }), []);
            return (0, n.jsxs)("group", {
                children: [(0, s.g)((0, n.jsx)(Waves, {pointer: l}), r), (0, s.g)((0, n.jsx)(Images, {}), t), (0, n.jsxs)("mesh", {
                    ref: e,
                    scale: [m.width, m.height, 1],
                    children: [(0, n.jsx)("planeGeometry", {}), (0, n.jsx)("shaderMaterial", {
                        fragmentShader: "\nuniform sampler2D uTexture;\nuniform sampler2D uDisplacement;\nuniform vec2 winResolution;\nvarying vec2 vUv;\nfloat PI = 3.141592653589793238;\n\nvoid main() {\n    vec2 vUvScreen = gl_FragCoord.xy / winResolution.xy;\n    vec4 displacement = texture2D(uDisplacement, vUvScreen);\n    float theta = displacement.r*2.0*PI;\n\n    vec2 dir = vec2(sin(theta), cos(theta));\n\n    vec2 uv = vUvScreen + dir*displacement.r * 0.075;\n    vec4 color = texture2D(uTexture, uv);\n\n    gl_FragColor = color;\n  }\n",
                        vertexShader: "\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  }\n",
                        uniforms: f
                    })]
                })]
            })
        }

        function Scene_Scene() {
            return (0, n.jsx)(a.Xz, {
                flat: !0,
                linear: !0,
                style: {background: "black"},
                children: (0, n.jsx)(Scene, {})
            })
        }

        function Home() {
            return (0, n.jsx)("main", {
                style: {width: "100%", height: "calc(100vh - 55px)"},
                children: (0, n.jsx)(Scene_Scene, {})
            })
        }
    }
}, function (e) {
    e.O(0, [3737, 5029, 2266, 9774, 2888, 179], function () {
        return e(e.s = 82883)
    }), _N_E = e.O()
}]);