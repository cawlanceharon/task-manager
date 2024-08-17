import AuthForm from '../components/AuthForm';
import PageBuilder from '../components/PageBuilder';

export default function HomePage() {
  return (
    <PageBuilder title="Login" width="sm">
      <AuthForm />
    </PageBuilder>
  );
}