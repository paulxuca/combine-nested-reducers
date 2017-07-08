# combine-nested-reducers
combines nested reducers

Turns

```javascript
combineNestedReducers({
  domainOne: {
    fun: () => true
  },
  domainTwo: {
    exciting: () => true
  }
})
```

*into*

```javascript
combineReducers({
  domainOne: combineReducers({
    fun: () => true
  }),
  domainTwo: combineReducers({
    exciting: () => true
  })
})
```

tbh it only saves you a few characters but it looks cleaner imo :rocket:
