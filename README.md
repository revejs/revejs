# <img src="https://github.com/revejs/revejs/blob/main/revejs.svg"> REVEjs: Leve lib for reactive programing

## What is Revejs?
Revejs is leve (Brazilian Portuguese word for "light") reactive library with API base on react hooks and solid-js.
## Goal
Goal of Revejs is to be light and make reactive programing easy to use for beginners.  
Revejs doesn't intend to compete with RXJS or other reactive libraries.

## Installation
```
npm i revejs
```

## Usage
Base of Revejs is signals like in solid-js and react state
```javascript
const [getter, setter] = createSignal('init value');
```
Getters and setter is functions, so value can be access like this
```javascript
console.log(getter())
```
And values set like this
```javascript
setter('new value')
```
Reactive part of revejs are effects.
They're just the functions that are called when setter is running
```javascript
createEffect(
    () => console.log('it run on value change'), 
    [getter, anotherGetter]
)
```
Effect can be nested
```javascript
createEffect(() => {
  createEffect(() => console.log(''), [getter])
}, [getter])
```


