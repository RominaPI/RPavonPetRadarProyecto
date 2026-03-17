import { FoundPet } from 'src/core/database/entities/foundPet.entity';
import { LostPet } from 'src/core/database/entities/lostPet.entity';
import { generateMapBoxImageTwoPoints } from 'src/core/utils/utils';

export const generatePetEmailTemplate = (foundPet: FoundPet, lostPet: LostPet): string => {

    const foundDate = new Date(foundPet.found_date).toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const mapImageUrl = generateMapBoxImageTwoPoints(
    (lostPet as any).lon, (lostPet as any).lat,
    foundPet.location.coordinates[0], foundPet.location.coordinates[1]
);
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background-color:#fff7fb;font-family:'Segoe UI',Roboto,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 30px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#ec4899,#fb923c);padding:36px 40px;color:white;">
<span style="background:rgba(255,255,255,0.25);padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;">
PetRadar Match 
</span>

<h1 style="margin:16px 0 0;font-size:26px;font-weight:700;">
¡Posible coincidencia encontrada!
</h1>

<p style="margin:8px 0 0;font-size:15px;opacity:0.95;">
Una mascota encontrada coincide con características de tu reporte.
</p>
</td>
</tr>

<!-- FOUND PET INFO -->
<tr>
<td style="padding:32px 40px 0;">

<h2 style="margin:0 0 16px;font-size:14px;color:#ec4899;text-transform:uppercase;letter-spacing:1px;">
Mascota encontrada
</h2>

<table width="100%" cellpadding="0" cellspacing="0"
style="background:#f0fdf4;border-radius:14px;">

<tr>
<td style="padding:22px;">

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td width="50%" style="padding-bottom:14px;">
<span style="font-size:11px;color:#9ca3af;">Especie</span><br>
<span style="font-size:15px;font-weight:600;color:#1f2937;">${foundPet.species}</span>
</td>

<td width="50%" style="padding-bottom:14px;">
<span style="font-size:11px;color:#9ca3af;">Raza</span><br>
<span style="font-size:15px;font-weight:600;color:#1f2937;">${foundPet.breed ?? 'No identificada'}</span>
</td>
</tr>

<tr>
<td width="50%" style="padding-bottom:14px;">
<span style="font-size:11px;color:#9ca3af;">Color</span><br>
<span style="font-size:15px;font-weight:600;color:#1f2937;">${foundPet.color}</span>
</td>

<td width="50%" style="padding-bottom:14px;">
<span style="font-size:11px;color:#9ca3af;">Tamaño</span><br>
<span style="font-size:15px;font-weight:600;color:#1f2937;">${foundPet.size}</span>
</td>
</tr>

<tr>
<td colspan="2">
<span style="font-size:11px;color:#9ca3af;">Descripción</span><br>
<span style="font-size:14px;color:#374151;line-height:1.6;">
${foundPet.description}
</span>
</td>
</tr>

</table>

</td>
</tr>
</table>

</td>
</tr>

<!-- CONTACT -->
<tr>
<td style="padding:24px 40px 0;">

<h2 style="margin:0 0 16px;font-size:14px;color:#fb923c;text-transform:uppercase;letter-spacing:1px;">
Contacto de quien la encontró
</h2>

<table width="100%" cellpadding="0" cellspacing="0"
style="background:#fff7ed;border-radius:14px;">

<tr>
<td style="padding:22px;">

<p style="margin:0 0 12px;font-size:15px;font-weight:600;color:#1f2937;">
${foundPet.finder_name}
</p>

<p style="margin:0 0 8px;font-size:14px;color:#374151;">
 ${foundPet.finder_email}
</p>

<p style="margin:0;font-size:14px;color:#374151;">
 ${foundPet.finder_phone}
</p>

</td>
</tr>
</table>

</td>
</tr>

<!-- MAP -->
<tr>
<td style="padding:28px 40px;">

<h2 style="margin:0 0 14px;font-size:14px;color:#16a34a;text-transform:uppercase;letter-spacing:1px;">
Ubicación aproximada
</h2>

<div style="margin-bottom:10px;">
<span style="font-size:12px;color:#ec4899;font-weight:600;margin-right:14px;">
● Donde se perdió
</span>

<span style="font-size:12px;color:#fb923c;font-weight:600;">
● Donde fue encontrada
</span>
</div>

<img src="${mapImageUrl}" width="520"
style="width:100%;border-radius:14px;display:block;"
alt="Mapa de ubicaciones"/>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="padding:0 40px 32px;">

<table width="100%" cellpadding="0" cellspacing="0"
style="border-top:1px solid #f1f5f9;padding-top:18px;">

<tr>
<td>

<p style="margin:0;font-size:12px;color:#9ca3af;">
Este correo fue generado automáticamente por <strong>PetRadar</strong>.
</p>

<p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">
Mascota encontrada el ${foundDate}
</p>

</td>
</tr>

</table>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};