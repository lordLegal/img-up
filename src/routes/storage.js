import React from 'react';
import withAuth from '../routes/withAuth';
import Files from '../components/Files';
import Upload from '../components/Upload';
function Storage() {
  return (
    <><Upload></Upload><Files></Files></>
  );
}
export default withAuth(Storage);