import { FixedPointNumber } from "@acala-network/sdk-core"
import { Button } from "@chakra-ui/react"
import { get, isEqual, isFinite, isNil, set } from "lodash"
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
	const { apiInstance, setApiInstance } = usePolkadotApi()
	const { selectedAccount } = useAccounts()
	const { selectedPool } = useSelectedPool()
	const { inputToken } = useInputToken()
	const { inputAmount } = useInputAmount()
	const [target, setTarget] = useState()
	const [swapTxData, setSwapTxData] = useState()
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
			const _swapTxData = []

			if (isEqual(target.length, 1)) {
				swapRx
					.swap(
						[inputToken, target[0]],
						new FixedPointNumber(inputAmount / 2),
						"EXACT_INPUT"
					)
					.subscribe((val) => set(_swapTxData, "[0]", val))
					.unsubscribe()
			} else if (isEqual(target.length, 2)) {
				swapRx
					.swap(
						[inputToken, target[0]],
						new FixedPointNumber(inputAmount, get(inputToken, "decimal")),
						"EXACT_INPUT"
					)
					.subscribe(
						(val) => set(_swapTxData, "[0]", val),
						(error) => console.error(error)
					)
					.unsubscribe()

				swapRx
					.swap(
						[get(_swapTxData, "[0].output._token"), target[1]],
						new FixedPointNumber(
							get(_swapTxData, "[0].output._balance").toNumber() / 2,
							get(_swapTxData, "[0].output._token.decimal")
						),
						"EXACT_INPUT"
					)
					.subscribe(
						(val) => set(_swapTxData, "[1]", val),
						(error) => console.error(error.message)
					)
					.unsubscribe()
			}

			return _swapTxData
		}

		if (mounted && inputAmount && inputToken && swapRx && target.length > 0) {
			const data = inputAmount > 0 && getSwapTxData()
			setSwapTxData(data)
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
			maxLiquidityA: get(swapTxData, "[1].input._balance"),
			maxLiquidityB: get(swapTxData, "[1].output._balance"),
			withStake: true,
		})

		if (mounted && walletInstance && selectedPool && swapTxData) {
			const data = getAddLiquidityTxData()
			setAddLiquidityTxData(data)
		}

		return () => {
			mounted = false
		}
	}, [selectedPool, swapTxData, walletInstance])

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
		console.log("handling")
		console.log(txData)
		// zapIn(txData, apiInstance)
	}

	// useEffect(() => {
	// 	const isDisabled =
	// 		!isWalletConnected || isNil(txData) || !isFinite(inputAmount)
	// 	console.log(inputAmount)
	// 	console.log(`
	// 	isDisabled: ${isDisabled}\n\n
	// 	!isWalletConnected: ${!isWalletConnected}\n\n
	// 	isNil(txData): ${isNil(txData)}\n\n
	// 	!isFinite(inputAmount): ${!isFinite(Number(inputAmount))}
	// 	`)
	// }, [inputAmount])

	return (
		<Button
			colorScheme="purple"
			size="lg"
			disabled={
				!isWalletConnected ||
				isNil(txData) ||
				!isFinite(Number(inputAmount)) ||
				Number(inputAmount) <= 0
			}
			onClick={transactionHandler}
		>
			Confirm
		</Button>
	)
}

export default ConfirmButton
