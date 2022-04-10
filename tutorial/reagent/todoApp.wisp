(ns example.bmi-component
    (:require [wisp.runtime :refer [= identity inc vals]]
              [wisp.sequence :refer [count into empty? assoc dissoc map filter
                                     lazy-seq first rest cons]] ; user by (for)
              [wisp.string :as s]
              [mreframe.util :refer [get-in assoc-in update-in]]
              [mreframe.atom :refer [deref reset! swap!]]
              [mreframe.reagent :as r]))

(def todos   (r/atom {}))
(def counter (r/atom 0))

(defn add-todo! [text]
  (let [id (swap! counter inc)]
    (swap! todos assoc id {:id id,  :title text,  :done false})))

(defn toggle! [id] (swap! todos update-in [id :done] #(not %)))
(defn save!   [id, title] (swap! todos assoc-in [id :title] title))
(defn remove! [id] (swap! todos dissoc id))

(defn mmap          [o f arg] (into {} (f arg o)))
(defn complete-all! [v]  (swap! todos mmap map    #(assoc-in % [1 :done] v)))
(defn clear-done!   []   (swap! todos mmap filter #(not (get-in % [1 :done]))))


(defn todo-input [{:keys [title onsave onstop]}]
  (let [val   (r/atom (or title ""))
        stop! #(do (reset val "")
                   (if onstop (onstop!)))
        save! #(do (let [v (s/trim @val)]
                     (if-not (empty? v) (onsave! v))
                     (stop!)))]
    (fn [{:keys [id class placeholder]}]
      [:input {:type :text,  :value @val
               :id id,  :class class,  :placeholder placeholder
               :onblur save!
               :oninput   #(reset! val (-> % :target :value))
               :onkeydown #(case (:which %)
                             13 (save!)
                             26 (stop!)
                             nil)}])))

(def todo-edit
  (r/create-class  ; not quite equivalent to the original code
    {:component-did-mount #(-> % :dom .focus!)
     :reagent-render      (fn [params] [todo-input params])}))

(defn todo-stats [{:keys [filt active done]}]
  (let [attrs-for (fn [name]
                    {:class   [(if (= name @filt) :selected)]
                     :onclick #(reset! filt name)})]
    [:div
      [:span#todo-count
        [:strong active] " " (if (= active 1) "item" "items") " left"]
      [:ul#filters
        [:li [:a (attrs-for :all)    "All"]]
        [:li [:a (attrs-for :active) "Active"]]
        [:li [:a (attrs-for :done)   "Completed"]]]
      (when (> done 0)
        [:button#clear-completed {:onclick clear-done!}
          "Clear completed " done])]))

(defn todo-item []
  (let [editing (r/atom false)]
    (fn [{:keys [id done title]}]
      [:li {:class {:completed done,  :editing @editing}}
        [:div.view
          [:input.toggle {:type :checkbox,  :checked done
                          :onchange #(toggle! id)}]
          [:label {:ondblclick #(reset! editing true)} title]
          [:button.destroy {:onclick #(remove id)}]]
        (when @editing
          [todo-edit {:class :edit,  :title title
                      :onsave #(save! id %)
                      :onstop #(reset! editing false)}])])))

(defn todo-app []
  (let [filt (r/atom :all)]
    (fn []
      (let [items  (vals @todos)
            done   (->> items (filter #(:done %)) count)
            active (- (count items) done)]
        [:div
          [:section#todoapp
            [:header#header
              [:h1 "todos"]
              [todo-input {:id          :new-todo
                           :placeholder "What needs to be done?"
                           :onsave      add-todo!}]]
            (when (> (count items) 0)
              [:div
                [:section#main
                  [:input#toggle-all {:type :checkbox,  :checked (= active 0)
                                      :onchange #(complete-all! (> active 0))}]
                  [:label {:for :toggle-all} "Mark all as complete"]
                  (into [:ul#todo-list]
                    (for [todo (filter (case @filt
                                         :active #(not (:done %))
                                         :done   #(:done %)
                                         identity)
                                       items)]
                      (r/with {:key todo.id} [todo-item todo])))]
                [:footer#footer
                  [todo-stats {:active active,  :done done,  :filt filt}]]])]
          [:footer#info
            [:p "Double-click to edit a todo"]]]))))


;; init
(add-todo! "Rename Cloact to Reagent")
(add-todo! "Add undo demo")
(add-todo! "Make all rendering async")
(add-todo! "Allow any arguments to component functions")
(complete-all! true)

(r/render [todo-app] (document/get-element-by-id :app))
