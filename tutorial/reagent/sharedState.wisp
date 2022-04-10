(ns example.shared-state
    (:require [mreframe.atom :refer [deref reset!]]
              [mreframe.reagent :as r]))

(defn atom-input [value]
  [:input {:type :text,  :value @value,
           :oninput #(reset! value (-> % :target :value))}])

(defn shared-state []
  (let [val (r/atom "foo")]
    (fn []
      [:div
        [:p "The value is now: " @val]
        [:p "Change it here: " [atom-input val]]])))
