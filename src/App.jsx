import Button from './components/Button/Button'
import Typography from './contents/Typography/Typography'
import A from './contents/Links/Links'

function App() {
    return (
        <div className="grid gap-6 font-figtree">
            <div className="flex items-center justify-center">
                <A href="https://setxo.com/" as="external">
                    <img src="/SetxoLogo.svg" className="h-20" alt="Setxo Logo" />
                </A>
            </div>
            <Typography as="heading" variant="h1" className="md:text-5xl text-3xl font-bold">
                Free React Components with Tailwind CSS
            </Typography>
            <Typography as="heading" variant="h2" className="md:text-3xl text-xl font-medium">Optimized for Laravel and Inertia js</Typography>
            <div className="flex items-center justify-center">
                <Button as="external" className="px-6" color="purple" size="xl" rounded="full" href="https://setxo.com/">Get Started</Button>
            </div>
        </div>
    )
}

export default App