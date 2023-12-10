import GameResult from '@/components/GameResult'
import { generateGameData, generateScores } from '@/utils/fakeData'
import { GameStruct, ScoreStruct } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'

interface PageProps {
  gameData: GameStruct
  scoresData: ScoreStruct[]
}

const Page: NextPage<PageProps> = ({ gameData, scoresData }) => {
  const { address } = useAccount()

  const handlePayout = async () => {
    if (!address) return toast.warning('Connect wallet first!')
    if (!gameData) return toast.warning('Game data not found')

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        //...
      }),
      {
        pending: 'Approve transaction...',
        success: 'Score saved successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div>
      <Head>
        <title>Play2Earn | Game Result</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {gameData && <GameResult game={gameData} scores={scoresData} />}

      <div className="flex justify-center space-x-2">
        <button
          className="bg-transparent border border-orange-700 hover:bg-orange-800
          py-2 px-6 text-orange-700 hover:text-white rounded-full
          transition duration-300 ease-in-out"
          onClick={handlePayout}
        >
          Payout
        </button>
      </div>
    </div>
  )
}

export default Page

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query
  const gameData: GameStruct = generateGameData(Number(id))[0]
  const scoresData: ScoreStruct[] = generateScores(5)

  return {
    props: {
      gameData: JSON.parse(JSON.stringify(gameData)),
      scoresData: JSON.parse(JSON.stringify(scoresData)),
    },
  }
}
