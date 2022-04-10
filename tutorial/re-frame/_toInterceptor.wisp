(ns example.->interceptor
  (:require [wisp.runtime :refer [merge]]
            [wisp.sequence :refer [nth]] ; used by destructuring
            [mreframe.re-frame :as rf]))

;; this interceptor prints out event context before and after its handling
(def dbg
  (rf/->interceptor
    {:id :dbg
     :before (fn [context]
               (console/debug "before:" context)
               context)
     :after  (fn [context]
               (console/debug "after:" context)
               context)}))

(defn set-foo [db [_ foo]]
  (merge db {:foo foo}))
(rf/reg-event-db :set-foo [dbg] set-foo)
