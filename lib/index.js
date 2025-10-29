import { defineComponent as V, ref as k, computed as R, onMounted as w, watchEffect as W, nextTick as D, onUnmounted as K, createElementBlock as _, openBlock as g, normalizeStyle as b, createElementVNode as E, renderSlot as S, Fragment as I, renderList as j, createCommentVNode as P, normalizeClass as x, createTextVNode as U, toDisplayString as B } from "vue";
import q from "leader-line-vue";
import { excludeKeys as G } from "filter-obj";
const J = { class: "decomposition-tree-header" }, Q = ["data-uid", "data-col", "data-index"], X = ["onClick"], Y = ["onClick"], Z = /* @__PURE__ */ V({
  __name: "DecompositionTree",
  props: {
    treeData: { default: () => [] },
    height: { default: "" },
    itemHeight: { default: 46 },
    itemSpacing: { default: 16 },
    color: { default: "rgb(224, 227, 235)" },
    activeColor: { default: "rgb(138, 110, 250)" },
    bodyStyle: { default: () => ({}) }
  },
  emits: ["onItemClick"],
  setup(y, { expose: F, emit: M }) {
    const N = M, r = y, c = k([]), m = k(null), f = k([]), z = R(() => c.value.length + 1), L = k([]), p = k(null), v = /* @__PURE__ */ new Map();
    w(() => {
      W(() => {
        O();
        const o = [];
        let n = [...r.treeData];
        new Array(z.value).fill([]).forEach((s, e) => {
          var i;
          if (o.push([]), n.forEach((t, l) => {
            var a;
            o[e].push({
              ...G(t, ["children"]),
              _uid: "item-" + e + "-" + l,
              _col: e,
              _index: l,
              _active: ((a = c.value) == null ? void 0 : a[e]) === l
            });
          }), m.value !== null && e >= m.value) {
            n = [];
            return;
          }
          n = typeof c.value[e] < "u" ? [...((i = n == null ? void 0 : n[c.value[e]]) == null ? void 0 : i.children) || []] : [];
        }), f.value = o, D(function() {
          const s = [];
          f.value.forEach((t, l) => {
            let a = 0;
            for (let u = 0; u < t.length; u++)
              a += r.itemHeight + (u ? r.itemSpacing : 0);
            s.push(a);
          });
          let e;
          if (r.height) {
            const t = window.getComputedStyle(p.value);
            e = p.value.offsetHeight - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom) - parseFloat(t.borderTopWidth) - parseFloat(t.borderBottomWidth);
          } else
            e = Math.max(...s);
          const i = [];
          f.value.forEach((t, l) => {
            let a = s[l];
            if (!a || a >= e) {
              i.push(0);
              return;
            }
            let u = 0;
            if (!l)
              u = e / 2;
            else {
              const T = c.value[l - 1];
              for (let H = 0; H <= T; H++)
                u += r.itemHeight + (H ? r.itemSpacing : 0);
              u += i[l - 1] - r.itemHeight / 2;
            }
            let d = 0, h = 0;
            u <= e / 2 ? (h = u * 2, h > a ? d = (h - a) / 2 : d = 0) : (h = (e - u) * 2, h > a ? d = e - h + (h - a) / 2 : d = e - a), i.push(d);
          }), L.value = i, D(() => {
            const t = p.value.getElementsByClassName("decomposition-tree-item");
            for (let l = 0; l < t.length; l++)
              v.set(t[l].getAttribute("data-uid"), {
                el: t[l],
                lineObj: null
              });
            f.value.forEach((l, a) => {
              if (!a || !l.length) return;
              const u = f.value[a - 1][c.value[a - 1]];
              l.forEach((d, h) => {
                const T = q.setLine(v.get(u._uid).el, v.get(d._uid).el, {
                  color: d._active ? r.activeColor : r.color,
                  size: 0.5,
                  endPlug: "disc"
                });
                v.set(d._uid, {
                  el: v.get(d._uid).el,
                  lineObj: T
                });
              });
            });
          });
        });
      });
    });
    function O() {
      v.forEach((o) => {
        o.lineObj && o.lineObj.remove();
      }), v.clear();
    }
    let C = null;
    w(function() {
      p.value.addEventListener("scroll", function() {
        C !== null && clearTimeout(C), C = setTimeout(() => {
          C = null, v.forEach((o) => {
            o.lineObj && o.lineObj.position();
          });
        }, 10);
      });
    }), K(() => {
      C !== null && clearTimeout(C), O(), p.value && p.value.removeEventListener("scroll");
    });
    function $(o, n, s) {
      m.value !== n && (m.value = null), typeof c.value[n] > "u" ? c.value.push(s) : (c.value[n] = s, c.value.splice(n + 1)), N("onItemClick", o);
    }
    function A(o, n, s) {
      if (c.value[n] !== s) {
        $(o, n, s);
        return;
      }
      m.value = m.value !== n ? n : null;
    }
    return F({
      selectedItem: c,
      columnData: f
    }), (o, n) => (g(), _("div", {
      class: "decomposition-tree",
      style: b({ height: r.height })
    }, [
      E("div", J, [
        S(o.$slots, "header", {
          selectedItem: c.value,
          columnData: f.value
        })
      ]),
      E("div", {
        class: "decomposition-tree-body",
        style: b(y.bodyStyle),
        ref_key: "decompositionTreeRef",
        ref: p
      }, [
        (g(!0), _(I, null, j(f.value, (s, e) => (g(), _(I, { key: e }, [
          s != null && s.length ? (g(), _("div", {
            key: 0,
            class: "decomposition-tree-column",
            style: b({ paddingTop: `${L.value[e]}px` })
          }, [
            (g(!0), _(I, null, j(s, (i, t) => (g(), _("div", {
              key: t,
              class: x(["decomposition-tree-item", { active: i._active }]),
              "data-uid": i._uid,
              "data-col": e,
              "data-index": t,
              style: b({ height: `${y.itemHeight}px`, marginBottom: `${y.itemSpacing}px` })
            }, [
              E("div", {
                class: "decomposition-tree-item-cnt",
                style: b({ borderColor: i._active ? r.activeColor : r.color }),
                onClick: (l) => $(i, e, t)
              }, [
                S(o.$slots, "item", {
                  item: i,
                  col: e,
                  index: t
                }, () => [
                  U(B(i.id), 1)
                ])
              ], 12, X),
              E("div", {
                class: x(["decomposition-tree-item-handle", c.value[e] === t && m.value !== e ? "expand" : ""]),
                style: b({ backgroundColor: r.activeColor }),
                onClick: (l) => A(i, e, t)
              }, B(!i._active || c.value[e] === t && m.value !== e ? "" : "+"), 15, Y)
            ], 14, Q))), 128))
          ], 4)) : P("", !0)
        ], 64))), 128))
      ], 4),
      S(o.$slots, "default")
    ], 4));
  }
}), oe = {
  install(y) {
    y.component("DecompositionTree", Z);
  }
};
export {
  oe as default
};
