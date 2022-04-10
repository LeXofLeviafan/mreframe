(ns example.bmi-component
    (:require [wisp.runtime :refer [int merge dictionary? dictionary]]
              [wisp.sequence :refer [assoc dissoc nth]]
              [mreframe.atom :refer [deref swap!]]
              [mreframe.reagent :as r]))

(defn calc-bmi [{:keys [height weight bmi], :as data}]
  (let [h (/ height 100)]
    (merge data (if bmi {:weight (* bmi h h)} {:bmi (/ weight (* h h))}))))

(def bmi-data (r/atom (calc-bmi {:height 180, :weight 80})))

(defn slider [param value min max invalidates]
  [:input {:type :range, :min min, :max max, :value value  ; order matters :-(
           :style {:width "100%"}
           :oninput (fn [e]
                      (let [new-value (parse-int e.target.value)]
                        (swap! bmi-data #(-> %
                                             (assoc param new-value)
                                             (dissoc invalidates)
                                             calc-bmi))))}])

(defn bmi-component []
  (let [{:keys [weight, height, bmi]} @bmi-data
        [color diagnose] (cond (< bmi 18.5) [:orange  "underweight"]
                               (< bmi 25)   [:inherit "normal"]
                               (< bmi 30)   [:orange  "overweight"]
                               :else        [:red     "obese"])]
    [:div
      [:h3 "BMI calculator"]
      [:div
        "Height: " (int height) "cm"
        [slider :height height 100 220 :bmi]]
      [:div
        "Weight: " (int weight) "kg"
        [slider :weight weight 30 150 :bmi]]
      [:div
        "BMI: " (int bmi) " "
        [:span {:style {:color color}} diagnose]
        [slider :bmi bmi 10 50 :weight]]]))
