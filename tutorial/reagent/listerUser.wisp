(ns example.lister-user
    (:require [wisp.sequence :refer [into range lazy-seq empty? first rest cons]]
                                               ; lazy-sec etc are used by (for)
              [mreframe.reagent :as r]))

(defn lister [items]
  (into [:ul]
    (for [item items]
      (r/with {:key item} [:li "Item " item]))))

(defn lister-user []
  [:div
    "Here is a list:"
    [lister (range 3)]])
