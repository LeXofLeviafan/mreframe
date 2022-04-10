(ns example.demo
  (:require [wisp.runtime :refer [merge]]
            [wisp.sequence :refer [first nth]]
            [wisp.string :as s]
            [mreframe.reagent :as r]
            [mreframe.re-frame :as rf]))


;; -- event dispatch ----------------------------------------------------------

(defn dispatch-timer-event []
  (rf/dispatch [:timer (Date.)]))  ; <-- dispatch used

;; Call the dispatching function every second.
(set-interval! dispatch-timer-event 1000)  ; do-timer


;; -- event handlers ----------------------------------------------------------

(rf/reg-event-db            ; sets up initial application state
 :initialize                ; usage:  (rf/dispatch [:initialize])
 (fn []                     ; the two parameters are not important here, so omitting them
   {:time      (Date.),     ; What it returns becomes the new application state
    :timeColor "#f88"}))    ; so the application state will initially be a dict with two keys


(rf/reg-event-db                ; usage:  (rf/dispatch [:time-color-change 34562])
 :time-color-change             ; dispatched when the user enters a new colour into the UI text field
 (fn [db [_ new-color-value]]   ; DB event handlers given 2 parameters: application state and event (a vector)
   (merge db {:timeColor new-color-value})))   ; compute and return the new application state


(rf/reg-event-db                 ; usage:  (rf/dispatch [:timer a-js-Date])
 :timer                          ; every second an event of this kind will be dispatched
 (fn [db [_ new-time]]           ; note how the 2nd parameter is destructured to obtain the data value
   (merge db {:time new-time}))) ; compute and return the new application state


;; -- query -------------------------------------------------------------------

(rf/reg-sub
 :time
 (fn [db _]        ; db is current app state. 2nd unused param is query array
   (:time db)))    ; return a query computation over the application state

(rf/reg-sub :timeColor #(:timeColor %))

(rf/reg-sub :time-show :<- [:time]
  #(-> % .to-time-string (s/split " ") first))


;; -- view functions ----------------------------------------------------------

(defn clock []
  [:div.example-clock {:style {:color (rf/dsub [:timeColor])}}
    (rf.dsub [:time-show])])

(defn color-input []
  [:div.color-input
    "Time color: "
    [:input {:type    :text
             :value   (rf/dsub [:timeColor])
             :oninput #(rf/dispatch [:time-color-change (-> % :target :value)])}]])  ; <---

(defn ui []
  [:div
    [:h1 "Hello world, it is now"]
    [clock]
    [color-input]])


;; -- entry point -------------------------------------------------------------

(rf/dispatch-sync [:initialize])                  ; put a value into application state
(r/render [ui] (document.get-element-by-id :app)) ; mount the application's ui into '<div id="app"/>'
