(ns example.reg-event-db
  (:require [wisp.runtime :refer [merge]]
            [wisp.sequence :refer [nth]] ; for destructuring
            [mreframe.re-frame :as rf]))


;; replaces db state with app-db
(rf/reg-event-db :init-db
  (fn [db event] app-db))

(rf/dispatch-sync [:init-db])  ; immediately evoke init-db{} (i.e. before r/render)


(rf/reg-event-db :set-view
  (fn [db [_ view]] (merge db {:view view})))

(rf/dispatch [:set-view :main])  ; asynchronously evoke set-view{:main}


(rf/reg-event-db :add-counter
  (fn [db [_ n]] (merge db {:counter (+ db.counter (or n 1))})))

(rf/disp [:add-counter 5])  ; asynchronously evoke add-counter{5}
;; (rf/disp evt & args) <=> (and evt (rf/dispatch (into evt args)))
