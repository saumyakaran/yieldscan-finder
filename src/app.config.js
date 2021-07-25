export const appName = "YieldScan"

// Selected network
const selectedNetwork = `Karura`

// Substrate networks
export const networks = [
	{
		id: "polkadot-cc1",
		name: "Polkadot",
		network: "polkadot",
		isTestNetwork: false,
		denom: "DOT",
		coinGeckoDenom: "polkadot",
		decimalPlaces: 10,
		twitterUrl: "@Polkadot",
		addressPrefix: 0,
		nodeWs: "wss://rpc.polkadot.io",
		erasPerDay: 1,
		lockUpPeriod: 28,
		minAmount: 1,
		recommendedAdditionalAmount: 50,
		about: "Polkadot is a heterogeneous multi‑chain technology.",
	},
	{
		id: "kusama-cc3",
		name: "Kusama",
		network: "kusama",
		isTestNetwork: false,
		denom: "KSM",
		twitterUrl: "@kusamanetwork",
		coinGeckoDenom: "kusama",
		decimalPlaces: 12,
		addressPrefix: 2,
		nodeWs: "wss://kusama-rpc.polkadot.io",
		erasPerDay: 4,
		lockUpPeriod: 7,
		minAmount: 0.1,
		recommendedAdditionalAmount: 0.5,
		about: "Kusama is an early, unaudited, and unrefined release of Polkadot.",
	},
	{
		id: "westend",
		name: "Westend",
		network: "westend",
		isTestNetwork: true,
		denom: "WND",
		twitterUrl: "@westend",
		coinGeckoDenom: undefined,
		decimalPlaces: 12,
		addressPrefix: 42,
		nodeWs: "wss://westend-rpc.polkadot.io",
		erasPerDay: 4,
		lockUpPeriod: 7,
		minAmount: 0.1,
		recommendedAdditionalAmount: 0.5,
		about: "Westend is one of the test networks for polkadot ecosystem.",
	},
	{
		id: "mandala",
		name: "Acala Mandala",
		network: "mandala",
		isTestNetwork: true,
		denom: "ACA",
		twitterUrl: "@AcalaNetwork",
		coinGeckoDenom: undefined,
		decimalPlaces: 13,
		addressPrefix: 42,
		nodeWs: "wss://mandala.elara.patract.io",
		erasPerDay: 4,
		lockUpPeriod: 7,
		minAmount: 0.1,
		recommendedAdditionalAmount: 0.5,
		about: "Mandala is one of the test networks for Acala Network.",
	},
	{
		id: "karura",
		name: "Karura",
		network: "karura",
		isTestNetwork: false,
		denom: "KAR",
		twitterUrl: "@KaruraNetwork",
		coinGeckoDenom: undefined,
		decimalPlaces: 12,
		addressPrefix: 8,
		nodeWs: "wss://karura.kusama.elara.patract.io",
		erasPerDay: 4,
		about: "Karura is the DeFi hub for Kusama",
	},
]

// TODO: Replace with internal links
export const tokenImage = {
	AUSD: "https://apps.acala.network/static/media/AUSD.439bc3f2.png",
	ACA: "https://apps.acala.network/static/media/ACA.96bf6b59.svg",
	DOT: "https://apps.acala.network/static/media/DOT.59c3bd06.svg",
	LDOT: "https://apps.acala.network/static/media/LDOT.2fb76173.svg",
	XBTC: "https://apps.acala.network/static/media/BTC.4ee9cb39.svg",
	RENBTC: "https://apps.acala.network/static/media/REN.dd61c20d.svg",
	POLKABTC: "https://apps.acala.network/static/media/polkaBTC.27cccd4a.svg",
	PLM: "https://apps.acala.network/static/media/plasm.6f74714d.png",
	PHA: "https://apps.acala.network/static/media/phala.fa4f3631.svg",
	KUSD: "https://apps.karura.network/static/media/KUSD.8dcf14f0.svg",
	KSM: "https://cryptologos.cc/logos/kusama-ksm-logo.svg?v=013",
	LKSM: "https://apps.karura.network/static/media/LKSM.e3933ae1.svg",
	KAR: "https://apps.karura.network/static/media/KAR.9e5c7ecd.svg",
}

export const getNetworkInfo = (networkName) => {
	return networks.find(({ name }) => name === networkName)
}

export const getAllNetworksInfo = () => {
	return networks
}

export const network = networks.find(({ name }) => name === selectedNetwork)
