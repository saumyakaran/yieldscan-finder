import { FixedPointNumber } from "@acala-network/sdk-core"
import { Button } from "@chakra-ui/react"
import { get, isEqual, isFinite, isNil } from "lodash"
import React, { useEffect, useState } from "react"
import getSwapTarget from "../../../../lib/get-swap-target"
import {
	useAccounts,
	useInputAmount,
	useInputToken,
	usePolkadotApi,
	useSelectedPool,
	useSwapRx,
	useWalletConnectionState,
	useWalletPromise,
} from "../../../../lib/store"
import zapIn from "../../../../lib/zap-in"

const ConfirmButton = () => {
	const { isWalletConnected } = useWalletConnectionState()
	const { swapRx } = useSwapRx()
	const { walletInstance } = useWalletPromise()
	const { apiInstance } = usePolkadotApi()
	const { selectedAccount } = useAccounts()
	const { selectedPool } = useSelectedPool()
	const { inputToken } = useInputToken()
	const { inputAmount } = useInputAmount()
	const [target, setTarget] = useState()
	const [swapTxData, setSwapTxData] = useState([])
	const [addLiquidityTxData, setAddLiquidityTxData] = useState()
	const [txData, setTxData] = useState()

	useEffect(() => {
		let mounted = true
		const getTarget = () => {
			const _target = getSwapTarget(
				{ inputToken, selectedPool },
				walletInstance
			)
			setTarget(_target)
		}

		if (mounted && walletInstance && selectedPool && inputToken) getTarget()

		return () => {
			mounted = false
		}
	}, [inputToken, selectedPool, walletInstance])

	useEffect(() => {
		let mounted = true
		const getSwapTxData = () => {
			if (isEqual(target.length, 1)) {
				swapRx
					.swap(
						[inputToken, target[0]],
						new FixedPointNumber(inputAmount / 2, get(inputToken, "decimal")),
						"EXACT_INPUT"
					)
					.subscribe((val) => setSwapTxData([val]))
					.unsubscribe()
			} else if (isEqual(target.length, 2)) {
				swapRx
					.swap(
						[inputToken, target[0]],
						new FixedPointNumber(inputAmount, get(inputToken, "decimal")),
						"EXACT_INPUT"
					)
					.subscribe(
						(val) => {
							if (mounted)
								setSwapTxData((s) => {
									if (get(s, "length") > 1) {
										return [val, s[1]]
									} else return [val]
								})
							swapRx
								.swap(
									[get(val, "output.token"), target[1]],
									new FixedPointNumber(
										get(val, "output.balance").toNumber() / 2,
										get(val, "output.token.decimal")
									),
									"EXACT_INPUT"
								)
								.subscribe(
									(val) => {
										if (mounted) setSwapTxData((s) => [s[0], val])
									},
									(error) => console.error(error.message)
								)
						},
						(error) => console.error(error)
					)
			}
		}

		if (
			mounted &&
			inputAmount &&
			inputToken &&
			swapRx &&
			get(target, "length") > 0
		) {
			getSwapTxData()
		}

		return () => {
			mounted = false
		}
	}, [inputAmount, inputToken, swapRx, target])

	useEffect(() => {
		let mounted = true

		const getAddLiquidityTxData = () => ({
			lpTokenA: walletInstance.getToken(get(selectedPool, "pool[0].token")),
			lpTokenB: walletInstance.getToken(get(selectedPool, "pool[1].token")),
			maxLiquidityA:
				swapTxData.length === 2
					? get(swapTxData, "[1].input.balance")
					: get(swapTxData, "[0].input.balance"),
			maxLiquidityB:
				swapTxData.length === 2
					? get(swapTxData, "[1].output.balance")
					: get(swapTxData, "[0].output.balance"),
			withStake: true,
		})

		if (
			mounted &&
			walletInstance &&
			selectedPool &&
			swapTxData &&
			target &&
			isEqual(get(target, "length"), get(swapTxData, "length"))
		) {
			const data = getAddLiquidityTxData()
			setAddLiquidityTxData(data)
		}

		return () => {
			mounted = false
		}
	}, [selectedPool, swapTxData, walletInstance, target])

	useEffect(() => {
		let mounted = true

		const getTxData = () => ({
			account: get(selectedAccount, "address"),
			swapTxData,
			addLiquidityTxData,
		})

		if (mounted && addLiquidityTxData && selectedAccount && swapTxData) {
			const data = getTxData()
			setTxData(data)
		}

		return () => {
			mounted = false
		}
	}, [addLiquidityTxData, selectedAccount, swapTxData])

	const transactionHandler = () => {
		console.log(txData)
		zapIn(txData, apiInstance)
	}

	return (
		<Button
			colorScheme="purple"
			size="lg"
			disabled={
				!isWalletConnected ||
				isNil(txData) ||
				!isFinite(Number(inputAmount)) ||
				Number(inputAmount) <= 0 ||
				get(target, "length") !== get(swapTxData, "length")
			}
			onClick={transactionHandler}
		>
			Confirm
		</Button>
	)
}

export default ConfirmButton
