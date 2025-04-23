import classes from './loading.module.css'


//loading page is a reserved file name as the layout and page js -- and in case of any loading under this page or any nested routes this page will be shown
//changed loading to loading-out to break the reserved name action  
export default function MealsLoadingPage(){
    return (
        <p className={classes.loading}>
            Fetching Meals...
        </p>
    )
}