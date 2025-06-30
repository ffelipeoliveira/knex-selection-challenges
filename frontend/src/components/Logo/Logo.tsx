import Logo from '/logo.svg'
import './logo.css'

function logo() {
  return (
	<div className='logo'>
		<img src={Logo}/>
		<div className="afterimages">
			<div className="effect-end-1"><h2 className='effect-start-1 bebas-neue'>NOT REAL</h2></div>
			<div className="effect-end-2"><h2 className='effect-start-2 bebas-neue'>NOT REAL</h2></div>
			<div className="effect-end-3"><h2 className='effect-start-3 bebas-neue'>NOT REAL</h2></div>
		</div>
	</div>
  )
}

export default logo