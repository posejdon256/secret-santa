# secret-santa
## How to use?
1. Install SescretSanta
```
$ npm i --save secret-santa-subjects
```
3. Import SecretSanta
```
$ import { SecretSanta } from 'secret-santa-subjects';
```
4. Create SecretSanta objet
```
$   /**
$   * Both arrays in parameters should have same size
$   * @param {Array} _namesWithEmails Example [{name: 'Ania', email: 'ania@ania.com'}, {name: 'Adam', email: 'adam@adam.com'}]
$   * @param {Array} _subjects Example: ['Cats', 'Dogs']
$  */
$ const Santa = new SecretSanta( [{name: 'Ania', email: 'ania@ania.com'}, {name: 'Adam', email: 'adam@adam.com'}],  ['Cats', 'Dogs'])
```
5. Test your Santa
```
$ Santa.test()
```
6. Send your Santa email
```
$* Attention! you need to enable not safe application in your gmail account
$* @param {string} sender - it should be your gmail email
$* @param {string} password - it should be your gmail password
$*/
$Santa.send(process.env.EMAIL, process.env.PASSWORD);
```
