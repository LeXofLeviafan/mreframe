(ns example.reg-event-fx
  (:require [wisp.runtime :refer [merge dictionary? dictionary]] ; used by destructuring
            [wisp.sequence :refer [nth drop vec lazy-seq empty? first rest cons]] ; used by (for)
            [mreframe.re-frame :as rf]))


;; evokes reminder{message} after specified delay
(rf/reg-event-fx :delayed-reminder
  (fn [cofx [_ message delay-msec]]
    {:dispatchLater {:dispatch [:reminder message],  :ms delay-msec}}))

;; displays the reminder (adds to app-db) and unsets it after 5 sec
(rf/reg-event-fx :reminder
  (fn [{db :db} [_ reminder]]
    (merge
      {:db (merge db {:reminder reminder})}
      (and reminder
        {:dispatchLater {:dispatch [:reminder],  :ms 5000}}))))


;; dispatches multiple events in the given order
(rf/reg-event-fx :schedule-reminders
  (fn [_ [_ & reminders]]
    {:fx (vec (for [it reminders]
                [:dispatch [:reminder it]]))}))
