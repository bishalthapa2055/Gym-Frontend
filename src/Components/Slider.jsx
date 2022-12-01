import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: all 1.5s ease;
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20;
  font-width: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: teal;
  cursor: pointer;
`;

const Slider = () => {
  return (
    <Container>
      <Wrapper>
        <Slide>
          <ImageContainer>
            <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
          </ImageContainer>
          <InfoContainer>
            <Title>Title</Title>
            <Description>Description</Description>
            <Button>BUY NOW</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
    </Container>
  );
};

export default Slider;
