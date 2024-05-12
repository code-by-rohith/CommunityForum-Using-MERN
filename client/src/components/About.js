// src/components/About.js
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
max-width: 800px;
margin: 20px auto;
padding: 20px;
background-color: #fff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
border-radius: 8px;
margin-top:100px;
`;

const Title = styled.h2`
color: #333;
margin-bottom: 20px;
`;

const Paragraph = styled.p`
line-height: 1.6;
margin-bottom: 10px;
`;

const About = () => {
	return (
		<AboutContainer>
    <Title>About Community Forum</Title>
    <Paragraph>
        Welcome to the Community Forum, a place where
        residents can connect, share ideas, and support
        each other. This platform allows you to raise
        requests, express your opinions, and engage in
        discussions with fellow community members.
    </Paragraph>
    <Paragraph>
        We believe in fostering a sense of community
        and collaboration. Feel free to explore the
        forum, like and contribute to requests, and
        be an active participant in shaping our community.
    </Paragraph>
    <Paragraph>
        Our forum is organized into various categories
        to make it easier for you to find relevant discussions.
        Whether you're interested in local events, seeking
        recommendations, or looking for help, there's something
        for everyone here.
    </Paragraph>
    <Paragraph>
        Additionally, we encourage respectful and constructive
        communication among members. Let's work together to
        create a welcoming and inclusive environment for all.
    </Paragraph>
    <Paragraph>
        As a member of our community forum, you have the
        opportunity to make a difference. Share your ideas,
        provide feedback, and collaborate with others to
        address common challenges and create positive change.
    </Paragraph>
    <Paragraph>
        Don't hesitate to reach out to the forum moderators
        if you have any questions or concerns. We're here to
        help and ensure that your experience on the Community
        Forum is enjoyable and productive.
    </Paragraph>
    {/* Add more paragraphs or elements as needed */}
</AboutContainer>
	);
};

export default About;
