{reFrame: rf, util: {getIn, identity, dict}} = require 'mreframe'

# extraction subscription
rf.regSub 'list', getIn  # (getIn db, ['list']) | (getIn db, ['list', idx]) | ...

# computation subscriptions (simple)
rf.regSub '#list', '<-', ['list'],    (list) -> list.length
rf.regSub 'first', '<-', ['list', 0], identity

# (derived from multiple)
rf.regSub 'pair', '<-', ['first'], '<-', ['list', 1],
          ([first, second], _sub) -> first + ", " + second

# (calculated dependency)
rf.regSub 'reverse', (([_, idx]) -> rf.subscribe ['list', idx]),
          (item, _sub) -> item.split("").reverse().join("")

# (multiple)
rf.regSub 'palindrome',
          (([_, idx]) -> [['list', idx], ['reverse', idx]].map rf.subscribe),
          ([item, reverse], _sub) -> item + reverse

# (dict)
rf.regSub 'sizes',
          (([_, ...keys]) -> dict keys.map (k) -> [k, rf.subscribe ['item', k]]),
          (dict, [_, ...keys]) -> dict keys.map (k) -> [k, dict[k].length]
