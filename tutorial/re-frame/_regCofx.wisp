(ns example.reg-cofx
  (:require [wisp.runtime :refer [dictionary? dictionary]] ; used by destructuring
            [wisp.sequence :refer [assoc vec]]
            [mreframe.re-frame :as rf]))


;; adds a value named :now into the cofx dict (non-pure function)
(rf/reg-cofx :time #(assoc % :now (Date.)))

;; uses the time coeffect (pure function)
(rf/reg-event-fx :show-time [(rf/inject-cofx :time)]
  (fn [{now :now}]
    {:alert (str "Current time is: " now)}))


;; loads a value from localStorage
(rf/reg-cofx :load
  (fn [cofx key]
    (try
      (assoc cofx key (JSON/parse (local-storage/get-item key)))
      (catch e cofx))))

;; loads :state from local-storage and adds it into appDb
(rf/reg-event-fx :load-state [(rf/inject-cofx :load :state)]
  (fn [{:strs [db state]}]
    {:db (assoc db :state state)}))
