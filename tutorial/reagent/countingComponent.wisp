(ns example.counting-component
    (:require [wisp.runtime :refer [inc]]
              [mreframe.atom :refer [deref swap!]]
              [mreframe.reagent :as r]))

(def click-count (r/atom 0))

(defn counting-component []
  [:div
    "The atom " [:code "clickCount"] " has value: "
    @click-count ". "
    [:input {:type :button,  :value "Click me!"
             :onclick #(swap! click-count inc)}]])
