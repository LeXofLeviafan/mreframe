let r = require('mreframe/reagent');
let {deref, swap} = require('mreframe/atom');
let {merge, assoc, dissoc, chain} = require('mreframe/util');

let calcBmi = data => {
  let {height, weight, bmi} = data;
  let h = height / 100;
  return merge(data, (bmi ? {weight: bmi * h * h} : {bmi: weight / (h * h)}));
};

var bmiData = r.atom( calcBmi({height: 180, weight: 80}) );

let slider = (param, value, min, max, invalidates) =>
  ['input', {type: 'range', min, max, value,  // order matters :-(
             style: {width: "100%"},
             oninput: e => {
               let newValue = parseInt(e.target.value);
               swap(bmiData, data => chain(data,
                                           [assoc, param, newValue],
                                           [dissoc, invalidates],
                                           calcBmi));
             }}];

let bmiComponent = () => {
  let {weight, height, bmi} = deref(bmiData);
  let [color, diagnose] = (bmi < 18.5 ? ['orange', "underweight"] :
                           bmi < 25   ? ['inherit', "normal"]     :
                           bmi < 30   ? ['orange', "overweight"]  :
                           ['red', "obese"]);
  return ['div',
           ['h3', "BMI calculator"],
           ['div',
             "Height: ", Math.floor(height), "cm",
             [slider, 'height', height, 100, 220, 'bmi']],
           ['div',
             "Weight: ", Math.floor(weight), "kg",
             [slider, 'weight', weight, 30, 150, 'bmi']],
           ['div',
             "BMI: ", Math.floor(bmi), " ",
             ['span', {style: {color}}, diagnose],
             [slider, 'bmi', bmi, 10, 50, 'weight']]];
};
