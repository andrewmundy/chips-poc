import Game from "~/components/Game";
import RulesProvider from "~/providers/Rules";

const Home = () => {
	const wrapper =
		'flex h-screen justify-center items-center bg-background select-none text-foreground';
	return (
		<div className={wrapper}>
			<RulesProvider>
				<Game />
			</RulesProvider>
		</div>

	);
};

export default Home;
