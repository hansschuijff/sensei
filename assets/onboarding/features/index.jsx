import { useState } from '@wordpress/element';
import { Card, H } from '@woocommerce/components';
import { Button, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useQueryStringRouter } from '../query-string-router';
import FeatureDescription from './feature-description';
import ConfirmationModal from './confirmation-modal';

// TODO: Make it dynamic.
const features = [
	{
		id: 'paid_courses',
		title: __( 'WooCommerce Paid Courses', 'sensei-lms' ),
		price: '$129.00 per year',
		description: __(
			'Sell your online courses using the most popular eCommerce plataform on the web - WooCommerce.',
			'sensei-lms'
		),
		confirmationExtraDescription: __(
			'(The WooCommerce plugin may also be installed and activated for free.)',
			'sensei-lms'
		),
		learnMoreLink:
			'https://woocommerce.com/products/woocommerce-paid-courses/',
	},
	{
		id: 'course_progress',
		title: __( 'Course progress', 'sensei-lms' ),
		description: __(
			'Enable your students to easily view their progress and pick up where they left off in a course.',
			'sensei-lms'
		),
		learnMoreLink:
			'https://woocommerce.com/products/sensei-course-progress/',
	},
	{
		id: 'certificates',
		title: __( 'Certificates', 'sensei-lms' ),
		description: __(
			'Award your students with a certificate of completion and a sense of accomplishment after finishing a course.',
			'sensei-lms'
		),
		learnMoreLink: 'https://woocommerce.com/products/sensei-certificates/',
	},
	{
		id: 'media_attachments',
		title: __( 'Media Attachments', 'sensei-lms' ),
		description: __(
			'Provide your students with easy access to additional learning materials, from audio files to slideshows and PDFs.',
			'sensei-lms'
		),
		learnMoreLink:
			'https://woocommerce.com/products/sensei-media-attachments/',
	},
	{
		id: 'content_drip',
		title: __( 'Content Drip', 'sensei-lms' ),
		price: '$29.00 per year',
		description: __(
			'Keep students engaged and improve knowledge retention by setting a delivery schedule for course content.',
			'sensei-lms'
		),
		learnMoreLink: 'https://woocommerce.com/products/sensei-content-drip/',
	},
].map( ( feature ) => ( {
	...feature,
	title: `${ feature.title } — ${
		feature.price ? feature.price : __( 'Free', 'sensei-lms' )
	}`,
} ) );

/**
 * Features step for Onboarding Wizard.
 */
const Features = () => {
	const [ confirmationModalActive, toggleConfirmationModal ] = useState(
		false
	);
	const [ isInstalling, setInstalling ] = useState( false );
	const [ selectedFeatureIds, setSelectedFeatureIds ] = useState( [] );
	const { goTo } = useQueryStringRouter();

	const finishSelection = () => {
		if ( 0 === selectedFeatureIds.length ) {
			goToNextStep();
		}

		toggleConfirmationModal( true );
	};

	const goToInstallation = () => {
		toggleConfirmationModal( false );
		setInstalling( true );
	};

	const goBackToSelection = () => {
		setInstalling( false );
	};

	const goToNextStep = () => {
		goTo( 'ready' );
	};

	const toggleItem = ( id ) => {
		setSelectedFeatureIds( ( selected ) => [
			...( selected.includes( id )
				? selected.filter( ( item ) => item !== id )
				: [ id, ...selected ] ),
		] );
	};

	return (
		<>
			<div className="sensei-onboarding__title">
				<H>
					{ __(
						'Enhance your online courses with these optional features!',
						'sensei-lms'
					) }
				</H>
			</div>
			<Card className="sensei-onboarding__card">
				{ isInstalling ? (
					<Button
						isPrimary
						className="sensei-onboarding__button sensei-onboarding__button-card"
						onClick={ goToNextStep }
					>
						{ __( 'Continue', 'sensei-lms' ) }
					</Button>
				) : (
					<>
						<div className="sensei-onboarding__checkbox-list">
							{ features.map(
								( {
									id,
									title,
									description,
									learnMoreLink,
								} ) => (
									<CheckboxControl
										key={ id }
										label={ title }
										help={
											<FeatureDescription
												description={ description }
												learnMoreLink={ learnMoreLink }
											/>
										}
										onChange={ () => toggleItem( id ) }
										checked={ selectedFeatureIds.includes(
											id
										) }
										className="sensei-onboarding__checkbox"
									/>
								)
							) }
						</div>
						<Button
							isPrimary
							className="sensei-onboarding__button sensei-onboarding__button-card"
							onClick={ finishSelection }
						>
							{ __( 'Continue', 'sensei-lms' ) }
						</Button>
					</>
				) }
			</Card>

			{ isInstalling && (
				<div className="sensei-onboarding__bottom-actions">
					<Button isTertiary onClick={ goBackToSelection }>
						&larr;&nbsp;
						{ __( 'Back to optional features', 'sensei-lms' ) }
					</Button>
				</div>
			) }

			{ confirmationModalActive && (
				<ConfirmationModal
					features={ features.filter( ( feature ) =>
						selectedFeatureIds.includes( feature.id )
					) }
					install={ goToInstallation }
					skip={ goToNextStep }
				/>
			) }
		</>
	);
};

export default Features;