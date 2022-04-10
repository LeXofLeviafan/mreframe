(ns example.reg-sub
  (:require [wisp.sequence :refer [nth]] ; for destructuring
            [mreframe.util :refer [get-in]]
            [mreframe.re-frame :as rf]))


(rf/reg-sub :view
  (fn [db sub] (:view db)))

(rf/subscribe [:view]) ; => RCursor returning current db.view value


(rf/reg-sub :item
  (fn [db [_ key]] (get-in db [:dict key])))

(rf/dsub [:item "foo"]) ; (get db.dict "foo")
;; (rf/dsub sub) <=> @(rf/subscribe sub)
