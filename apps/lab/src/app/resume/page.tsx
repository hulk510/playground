import Education from './_components/Education'
import Hero from './_components/Hero'
import PlayfulComponents from './_components/PlayfulComponents'
import Projects from './_components/Projects'
import TechStack from './_components/TechStack'
import Timeline from './_components/Timeline'

export default function Page() {
  return (
    <div className='bg-amber-50'>
      <Hero />
      <TechStack />
      <Timeline />
      <Education />
      <Projects />
      <PlayfulComponents />
    </div>
  )
}
