(ns example.reg-fx
  (:require [wisp.runtime :refer [dictionary? dictionary] ; used by
            [wisp.sequence :refer [vec nth]               ;  destructuring
            [mreframe.util :refer [assoc-in]]
            [mreframe.re-frame :as rf]))


;; side-effect alert(arg)
(rf/reg-fx :alert #(alert %))

;; event alert{msg} causes side-effect alert
(rf/reg-event-fx :alert
  (fn [cofx [_ msg]] {:alert msg}))


(defn -json-request [response]
  (if response.ok (response.json) (Promise/reject response.status)))
;; downloads JSON from a URL, then evokes passed event with added param
(defn fetch-json [{:strs [url params on-success on-failure]}]
  (.. (fetch url params)
      (then -json-request)
      (then #(rf/disp on-success %))
      (catch #(rf/disp on-failure %))))
(rf/reg-fx :fetchJson fetch-json)

;; event fetch-json{key, url} causes side-effect fetchJson
(rf/reg-event-fx :fetch-json
  (fn [{db :db} [_ key url]]
    {:fetchJson {:url url,  :params db.params,  :on-success [:-fetch-json key]}}))

;; evoked by fetchJson on success
(rf/reg-event-fx :-fetch-json
  (fn [{db :db} [_ key data]]
    {:db    (assoc-in db [:cache key] data)
     :alert (str "Fetched '" key "'!")}))
