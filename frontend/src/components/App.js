import Header from "./header";
import Footer from "./footer";
import Article from "./article";
import Categories from "./categories";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Page() {
    return (
        <div>
            <Header/>
            <Categories/>
            <Footer/>
        </div>
    );
}

function Home() {
    return (
        <div>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Overview
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Overview over the available categories
                </Typography>
            </Container>
            <Categories/>
        </div>
    );
}

export default Page;