(ns example.reg-sub2
  (:require [wisp.runtime :refer [identity]]
            [wisp.sequence :refer [map into nth drop]]
            [wisp.string :as s]
            [mreframe.util :refer [get-in]]
            [mreframe.re-frame :as rf]))

;; extraction subscription
(rf/reg-sub :list get-in)  ; (get-in db [:list]) | (get-in db [:list idx]) | ...

;; computation subscriptions (simple)
(rf/reg-sub :#list :<- [:list] #(:length %))
(rf/reg-sub :first :<- [:list 0] identity)

;; (derived from multiple)
(rf/reg-sub :pair :<- [:first] :<- [:list 1]
  (fn [[first second] -sub] (str first ", " second)))

;; (calculated dependency)
(rf/reg-sub :reverse (fn [[_ idx]] (rf/subscribe [:list idx])) s/reverse)

;; (multiple)
(rf/reg-sub :palindrome
            (fn [[_ idx]] (map rf/subscribe [[:list idx] [:reverse idx]]))
            (fn [[item reverse] -sub] (str item reverse)))

(defn -keys->dict [ks f] (into {} (map vector ks (map f ks))))
;; (dict)
(rf/reg-sub :sizes (fn [[_ & keys]] (-keys->dict keys #(rf/subscribe [:item %])))
  (fn [dict [_ & keys]]
    (-keys->dict keys #(get-in dict [% :length]))))
