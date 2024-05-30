import { HomeContainer, LogoContainer, TitleContainer } from './index.style.ts'
import logoSvg from '/muscle.svg'
import titleSvg from '/title.svg'

function Home() {
  return (
    <HomeContainer>
      <LogoContainer src={logoSvg} alt="logo" />
      <TitleContainer src={titleSvg} alt="title" />
    </HomeContainer>
  )
}

export default Home
