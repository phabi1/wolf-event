/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from "@wordpress/block-editor";

import { PanelBody, SelectControl } from "@wordpress/components";
import { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			const fetchedEvents = await apiFetch({ path: "/wolf-event/v1/events" });
			setEvents(fetchedEvents.items || []);
		};
		fetchEvents();
	}, []);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Button Settings", "wolf-event")}>
					<SelectControl
						label={__("Event", "wolf-event")}
						value={attributes.eventId}
						options={[
							{ label: "Select an event", value: "" },
							...events.map((event) => ({
								label: event.title,
								value: event.id,
							})),
						]}
						onChange={(newEventId) => setAttributes({ eventId: newEventId })}
					/>
				</PanelBody>
			</InspectorControls>
			<a {...useBlockProps()}>
				<RichText
					tagName="span"
					value={attributes.buttonText}
					onChange={(newText) => setAttributes({ buttonText: newText })}
					placeholder={__("Register Now", "wolf-event")}
				/>
			</a>
		</>
	);
}
