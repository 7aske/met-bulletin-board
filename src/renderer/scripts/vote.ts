async function vote(e: Event, a: string, b: number) {
	const target = event.target as HTMLDivElement;
	const url = "http://127.0.0.1:5000/vote/" + target.parentElement.attributes.getNamedItem("data-id").value;
	const resp = await fetch(url, {
		headers: new Headers({"Content-Type":"application/x-www-form-urlencoded","Access-Control-Allow-Origin":"*"}),
		method: "POST",
		body: `vote=${a}&id=${b}&index=${3333}`,
	});
	const json = await resp.json();
	console.log(json);
}

