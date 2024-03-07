import Game from "~/components/Game";

const Home = () => {
	const wrapper =
		'flex h-screen justify-center items-center bg-background select-none text-foreground';
	return (
		<div className={wrapper}>
			<Game/>
		</div>

	);
};

export default Home;
