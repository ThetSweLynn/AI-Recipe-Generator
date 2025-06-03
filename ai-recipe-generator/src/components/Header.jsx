import chefLogo from '../assets/chef.png';

export default function Header() {
    return (
        <header>
            <img src={chefLogo} alt="chef logo" />
            <h2>Chef Mistral</h2>
        </header>
    )
}