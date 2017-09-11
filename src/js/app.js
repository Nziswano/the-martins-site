// import * as Demo from '../ts/app.ts'
import Template from '../templates/app.hbs'

let data = {
  'name': 'Alan',
  'hometown': 'Somewhere, TX',
  'kids': [{'name': 'Jimmy', 'age': '12'}, {'name': 'Sally', 'age': '4'}]
}

let content = Template(data)

document.querySelector('main').innerHTML = content

console.log(content)
