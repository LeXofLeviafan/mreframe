(ns example.simple-example
    (:require [mreframe.atom :refer [deref reset!]]
              [mreframe.reagent :as r]))

(def timer (r/atom (Date.)))
(def time-color (r/atom "#f34"))


(defn greeting [message]
  [:h1 message])

(defn clock []
  (let [[time-str] (.. @timer to-time-string (split " "))
    [:div.example-clock {:style {:color @time-color}}
      time-str]))

(defn color-input []
  [:div.color-input
    "Time color: "
    [:input {:type :text,  :value @time-color,
             :oninput #(reset! time-color (-> % :target :value))}]])

(defn simple-example []
  [:div
    [greeting "Hello world, it is now"]
    [clock]
    [color-input]])


(set-interval! #(reset! timer (Date.)) 1000)  ; time-updater

(r/render [simple-example] (document/get-element-by-id :app))
