(ns example.interceptors
  (:require [wisp.sequence :refer [assoc nth]]
            [mreframe.util :refer [assoc-in]]
            [mreframe.re-frame :as rf]))


;; rf/path works on specified subpath of db (similarly to using assoc-in)
(rf/reg-event-db :set-foo [(rf/path :foo)]
  (fn [db [_ foo]] foo))


;; rf/unwrap and rf/trim-v simplify event data passed into handler
(rf/reg-event-db :set [rf/trim-v]
  (fn [db [key value]] (assoc db key value)))
(rf/reg-event-db :set-foo [rf/unwrap]
  (fn [db foo] (assoc db :foo foo)))


;; rf/enrich and rf/after do post-processing of db after the event
(def ensure-number
  (rf/enrich (fn [db [_ key]]
               (assoc db key (or (Number (get db key)) 0)))))    ; db is updated
(def save-state
  (rf/after (fn [db event]
              (localStorage/set-item :db (JSON/stringify db))))) ; side-effect

;; after setting the value, it's converted to a number, then db is saved
(rf/reg-event-db :set-number [save-state ensure-number]
  (fn [db [_ key value]] (assoc db key value)))


;; rf/on-changes is similar to rf/enrich but recalculates conditionally
(def calc-total
  (rf/on-changes #(+ %1 %2 %3)
                 [:outputs :total]
                 [:inputs 1] [:inputs 2] [:inputs 3]))

;; if any of the three inputs is changed, db.outputs.total is recalculated
(rf/reg-event-db :set-input [calc-total]
  (fn [db [_ key value]]
    (assoc-in db [:inputs key] value)))
