import WelcomeOne from "@/components/WelcomeOne";
import WelcomeTwo from "@/components/WelcomeTwo";

type Props = {
    searchParams: {
        step?: string;
    };
}
export default function WelcomePage({searchParams}: Props) {
    const step = searchParams?.step ?? '1';

    return (
        <div className='flex h-screen w-full items-center justify-center bg-gradient-to-br from-green-300 to-blue-300 p-4'>
            {step === '1' && <WelcomeOne />}
            {step === '2' && <WelcomeTwo />}
        </div>
    )
}