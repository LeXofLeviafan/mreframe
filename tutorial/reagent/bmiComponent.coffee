r = require 'mreframe/reagent'
{deref, swap} = require 'mreframe/atom'
{merge, assoc, dissoc, chain} = require 'mreframe/util'

calcBmi = (data) ->
  {height, weight, bmi} = data
  h = height / 100
  merge data, (if bmi  then weight: bmi * h * h  else bmi: weight / (h * h))

bmiData = r.atom (calcBmi height: 180, weight: 80)

slider = (param, value, min, max, invalidates) ->
  ['input', {type: 'range', min, max, value,\  # order matters :-(
             style: {width: "100%"},\
             oninput: (e) ->
               newValue = parseInt e.target.value
               swap bmiData, (data) -> (chain data,
                                              [assoc, param, newValue]
                                              [dissoc, invalidates]
                                              calcBmi)}]

bmiComponent = ->
  {weight, height, bmi} = deref bmiData
  [color, diagnose] = switch
    when bmi < 18.5  then ['orange', "underweight"]
    when bmi < 25    then ['inherit', "normal"]
    when bmi < 30    then ['orange', "overweight"]
    else ['red', "obese"]
  ['div'
    ['h3', "BMI calculator"]
    ['div'
      "Height: ", (Math.floor height), "cm"
      [slider, 'height', height, 100, 220, 'bmi']]
    ['div'
      "Weight: ", (Math.floor weight), "kg"
      [slider, 'weight', weight, 30, 150, 'bmi']]
    ['div'
      "BMI: ", (Math.floor bmi), " "
      ['span', {style: {color}}, diagnose]
      [slider, 'bmi', bmi, 10, 50, 'weight']]]
