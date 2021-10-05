let contacts = [];
let currindex = 0;

/* 
---------------------------
---------------------------
---------------------------
slider
---------------------------
---------------------------
---------------------------
*/

const statefull = StateFull('.statefull');

document.getElementById('prev').addEventListener('click', () => {
	/* Incrimenting */
	if (currindex <= 0) currindex = contacts.length - 1;
	currindex--;
	/* Set Default Contact state For StateFull*/
	statefull.setState(contacts[currindex]);
});

document.getElementById('next').addEventListener('click', () => {
	/* Incrimenting */
	if (currindex >= contacts.length - 1) currindex = 0;
	currindex++;
	/* Set Default Contact state For StateFull*/
	statefull.setState(contacts[currindex]);
});

/* 
---------------------------
---------------------------
---------------------------
contact List
---------------------------
---------------------------
---------------------------
*/

const statefullList = StateFullList('.statefull-list', {
	click: (e, state) => {
		currindex = state.index;
		statefull.setState(contacts[currindex]);
	},
});
statefullList.template(`
<a href="#" class="card">
  <img src="{{img}}" alt="{{name}}">
  <h1>{{name}}</h1>
  <p class="title">Gender {{gender}}</p>
  <p>From <b>{{country}}</b></p>
</a>
`);

/* 
---------------------------
---------------------------
---------------------------
Data fatching
---------------------------
---------------------------
---------------------------
*/
(async () => {
	/*  FAtching Contacts From */
	const res = await fetch('https://randomuser.me/api/?results=10');
	const { results } = await res.json();

	/*  Maping and Genrating Contacts */
	contacts = results.map((item, i) => ({
		id: item.login.uuid,
		index: i,
		name: item.name.title + ' ' + item.name.first + ' ' + item.name.last,
		email: item.email,
		username: item.login.username,
		password: item.login.password,
		phone: item.phone,
		call: item.call,
		img: item.picture.large,
		gender: item.gender,
		country: item.location.country,
		age: item.dob.age,
		date_of_birth: item.dob.date,
	}));

	/* Set Default Contact state For StateFull*/
	statefull.setState(contacts[currindex]);

	/* Set State Fro StateFull List */
	statefullList.setState(contacts);
})();
