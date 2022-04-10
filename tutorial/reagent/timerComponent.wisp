(ns example.timer-component
    (:require [wisp.runtime :refer [inc]]
              [mreframe.atom :refer [deref swap!]]
              [mreframe.reagent :as r]))

(defn timer-component []
  (let [seconds-elapsed (r/atom 0)]
    (fn []
      (set-timeout! #(swap! seconds-elapsed inc) 1000)
      [:div "Seconds Elapsed: " @seconds-elapsed])))
