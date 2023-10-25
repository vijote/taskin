import { useNavigate } from "react-router-dom";
import { flushSync } from 'react-dom'

function useAnimatedNavigation() {
    const navigate = useNavigate()

    function navigateWithTransition(url: string) {
        console.log('transitioning!');

        const transition = document.startViewTransition(() => {
            console.log('starting transition!');

            flushSync(() => {
                navigate(url)
            })
        });

        console.log(transition);

        // when transition start run animation
        transition.ready.then(() => {
            document.documentElement.animate(
                [
                    // keyframes
                    { transform: "translateX(100%)", overflow: 'hidden' },
                    { transform: "translateX(0%)", overflow: 'hidden' },
                ],
                {
                    // timing options
                    duration: 500,
                    iterations: 1,
                    easing: "ease-in",
                    pseudoElement: "::view-transition-new(root)",
                },
            );
            document.documentElement.animate(
                [
                    // keyframes
                    { transform: "translateX(0%)", opacity: '1', overflow: 'hidden' },
                    { transform: "translateX(-100%)", opacity: '0', overflow: 'hidden' },
                ],
                {
                    // timing options
                    duration: 500,
                    iterations: 1,
                    easing: "ease-in",
                    pseudoElement: "::view-transition-old(root)",
                },
            );
        });

        transition.finished.then(data => {
            console.log("finished!", data);
            
        })
    }

    return (document.startViewTransition ? navigateWithTransition : navigate)
}

export default useAnimatedNavigation