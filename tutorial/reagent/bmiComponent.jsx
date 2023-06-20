import r from 'mreframe/reagent';
import { deref, swap } from 'mreframe/atom';
import { merge, assoc, dissoc, chain } from 'mreframe/util';

let calcBmi = data => {
  let {height, weight, bmi} = data;
  let h = height / 100;
  return merge(data, (bmi ? {weight: bmi * h * h} : {bmi: weight / (h * h)}));
};

var bmiData = r.atom( calcBmi({height: 180, weight: 80}) );

let Slider = (param, value, min, max, invalidates) => (
  <input type="range" min={min} max={max} value={value /* order matters :-( */}
         style={{width: "100%"}}
         oninput={e => {
           let newValue = parseInt(e.target.value);
           swap(bmiData, data => chain(data,
                                       [assoc, param, newValue],
                                       [dissoc, invalidates],
                                       calcBmi));
         }}/>
);

let BmiComponent = () => {
  let {weight, height, bmi} = deref(bmiData);
  let [color, diagnose] = (bmi < 18.5 ? ['orange', "underweight"] :
                           bmi < 25   ? ['inherit', "normal"]     :
                           bmi < 30   ? ['orange', "overweight"]  :
                           ['red', "obese"]);
  return (
    <div>
      <h3>BMI calculator</h3>
      <div>
        Height: {Math.floor(height)}cm
        <Slider>{['height', height, 100, 220, 'bmi']}</Slider>
      </div>
      <div>
        Weight: {Math.floor(weight)}kg
        <Slider>{['weight', weight, 30, 150, 'bmi']}</Slider>
      </div>
      <div>
        BMI: {Math.floor(bmi)}{" "}
        <span style={{color}}>{diagnose}</span>
        <Slider>{['bmi', bmi, 10, 50, 'weight']}</Slider>
      </div>
    </div>
  );
};
