import { useAuthStore } from "@/store";

const Home = () => {
    const { user } = useAuthStore();
    return (
        <div>Home</div>
    )
}
export default Home
