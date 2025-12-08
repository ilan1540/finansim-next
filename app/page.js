import { PageHeader } from './components/PageHeader';


//const queryClient = new QueryClient();


export default function Home({ Component, pageProps }) {
 
  return (
    
      <div className="flex flex-col justify-items-center min-h-max ">
      <main className="flex-grow ">
        <div className='w-60 mx-auto' >
          <PageHeader
          word1={'מערכת'}
          word2={'ניהול'}
        /> 
      </div>
        
        
      </main>
      
    </div>
   


    
  );
}
